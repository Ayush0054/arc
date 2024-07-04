"use server";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/app/lib/db";

export const initialProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return redirectToSignIn();
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    if (profile) {
      return profile;
    }

    const newProf = await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        pfp: user.imageUrl,
        currentStatus: "Offline",
      },
    });
    return newProf;
  } catch (error) {
    console.error("Error in initialProfile:", error);
    throw error; // or handle it according to your error handling strategy
  }
};

// [
//   1. Set a goal for weekly weight loss and running distance.
//   2. Create a running schedule (e.g., running 5 times a week).
//   3. Visit a doctor for a health check-up.
//   4. Invest in a good pair of running shoes.
//   5. Plan a balanced diet to complement the running.
//   6. Start with a mix of walking and running if new to running.
//   7. Track daily running progress and diet.
//   8. Increase running distance or intensity each week.
//   9. Participate in a local running group or find a running buddy.
//   10. Ensure adequate rest and recovery to prevent injuries.
//   11. Monitor weight loss every week.
//   12. Adjust running routine and diet as necessary based on progress.
//   13. Learn and practice proper running techniques.
//   14. Stay hydrated and follow proper nutritional guidelines.
//   15. Celebrate milestones and progress to stay motivated.
//   ]

// [
//   1. Set a daily running schedule, starting with shorter distances and gradually increasing.
//   2. Buy a pair of comfortable running shoes and suitable running attire.
//   3. Create a weekly running plan, mixing in various types of runs (sprint, long distance, hill training).
//   4. Measure and track your weight and running performance daily.
//   5. Join a local running group or find a running partner for motivation.
//   6. Establish a nutrition plan to ensure you are fueling your body correctly for weight loss.
//   7. Schedule regular rest days to prevent injury and overexertion.
//   8. Download a running app to track your runs and monitor progress.
//   9. Set short-term weekly goals leading up to July 31, 2024.
//   10. Read articles or watch videos on proper running techniques and form.
//   11. Plan a reward for reaching your end goal by July 31, 2024.
