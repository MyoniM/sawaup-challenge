import { PrismaClient } from '@prisma/client';
import readXlsxFile from 'read-excel-file/node';
import fs from 'fs';

const prisma = new PrismaClient();
async function createDemoUserIfDontExist() {
  const user = await prisma.user.findFirst({
    where: {
      id: 'testUser',
    },
  });
  if (user == null) {
    await prisma.user.create({
      data: {
        id: 'testUser',
      },
    });
  }
}
async function createSkillsIfDontExist(params: any) {
  //! I can't use the repository functions I used for the website
  //! since I am using absolute import on the modules and this file runs
  //! independently

  //? Don't recreate the skill if it exists
  const doesSkillEXist = await prisma.skill.findFirst({
    where: {
      name: params.name,
    },
    include: {
      CoursesAndSkills: {
        select: {
          courseId: true,
        },
      },
      UserSelectedSkills: {
        select: {
          userId: true,
        },
      },
    },
  });
  if (doesSkillEXist != null) {
    return {
      courses: doesSkillEXist.CoursesAndSkills.map((e: any) => e.courseId),
      isSelected: doesSkillEXist.UserSelectedSkills.length != 0,
      id: doesSkillEXist.id,
      name: doesSkillEXist.name,
    };
  }
  const skill = await prisma.skill.create({
    data: {
      name: params.name,
    },
    include: {
      CoursesAndSkills: {
        select: {
          courseId: true,
        },
      },
      UserSelectedSkills: {
        select: {
          userId: true,
        },
      },
    },
  });
  return {
    courses: skill.CoursesAndSkills.map((e: any) => e.courseId),
    isSelected: skill.UserSelectedSkills.length != 0,
    id: skill.id,
    name: skill.name,
  };
}

async function createCourse(params: any) {
  const course = await prisma.course.create({
    data: {
      name: params.name,
      video_url: params.video_url,
      CoursesAndSkills: {
        createMany: {
          data: params.skills.map((skillId: any) => {
            return {
              skillId,
            };
          }),
        },
      },
    },
    include: {
      CoursesAndSkills: {
        select: {
          skillId: true,
        },
      },
      UserFavoriteCourses: {
        select: {
          userId: true,
        },
      },
    },
  });
  return {
    id: course.id,
    isFavorite: course.UserFavoriteCourses.length != 0,
    name: course.name,
    video_url: course.video_url,
    skills: course.CoursesAndSkills.map((skill: any) => skill.skillId),
  };
}
export async function main() {
  console.log('====================================');
  console.log('Running the database seed command :)');
  console.log('====================================');
  console.time('db_seed');

  //? Create a dummy user if don't exist
  await createDemoUserIfDontExist();
  //? Reset the database
  await prisma.coursesAndSkills.deleteMany();
  await prisma.userFavoriteCourses.deleteMany();
  await prisma.userSelectedSkills.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.course.deleteMany();

  //? Read from the excel file
  const rows = await readXlsxFile(Buffer.from(fs.readFileSync('./src/prisma/seed/coding_challenge.xlsx')));
  for (let index = 1; index < rows.length; index++) {
    const name = rows[index][0].toString();
    const url = rows[index][1].toString();
    const skillIDs: number[] = [];

    for (let j = 2; j < rows[index].length; j++) {
      let skill = await createSkillsIfDontExist({
        name: rows[index][j].toString(),
      });
      skillIDs.push(skill.id);
    }

    await createCourse({ name, video_url: url, skills: skillIDs });
  }
  console.timeEnd('db_seed');
  console.log('Done');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
