import prisma from "../../../prisma/prisma";
import { Errors } from "../../Errors/custom-error";
import { GoalsProps } from "../../types";

export async function createGoal({
  userId,
  data,
}: {
  userId: string;
  data: GoalsProps;
}) {
  const { goal } = data;

  if (!userId) {
    throw new Errors("user id is required", 400);
  }

  const goals = await prisma.goals.create({
    data: {
      goal: goal,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!goals) {
    throw new Errors("user not found", 404);
  }

  return goals;
};



export async function findGoalsByUser(userId: string, query: any){
    const { dateIn, dateOut } = query

    if(!userId){
        throw new Errors("user id is required", 400)
    };


    const goals = await prisma.goals.findMany({
        where: {
            user: {
                id: userId
            },
            createdAt: {
                gte: dateIn,
                lte: dateOut
            }
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    });

    return goals;
};



export async function findGoalById(id: string){

    const goal = await prisma.goals.findUnique({
        where: {
            id: id
        }
    });

    if(!goal){
        throw new Errors("not found", 404);
    };

    return goal;
};


export async function updateGoal(id: string, data: GoalsProps){
    
    const goal = await prisma.goals.update({
        where: {
            id: id
        },
        data: {
            goal: data.goal
        }
    });


    if(!goal){
        throw new Errors("not found", 404);
    };

    return goal
}
