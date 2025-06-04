// import { PrismaClient, UserRole, AuthProvider } from "@prisma/client";
// import { OAuth2Client } from "google-auth-library";

// const prisma = new PrismaClient();

// interface SocialUserData {
//   email: string;
//   firstName: string;
//   lastName: string;
//   providerId: string;
//   providerData: any;
//   profileImage?: string;
// }

// export const handleSocialLogin = async (
//   provider: AuthProvider,
//   userData: SocialUserData
// ) => {
//   // Check if user exists
//   const existingUser = await prisma.user.findUnique({
//     where: {
//       email: userData.email,
//     },
//     include: {
//       client: true,
//       lawyer: true,
//       staff: true,
//       admin: true,
//     },
//   });

//   if (existingUser) {
//     // If user exists, update provider information
//     return prisma.user.update({
//       where: { id: existingUser.id },
//       data: {
//         authProvider: provider,
//         providerId: userData.providerId,
//         providerData: userData.providerData,
//         profileImage: userData.profileImage,
//       },
//       include: {
//         client: true,
//         lawyer: true,
//         staff: true,
//         admin: true,
//       },
//     });
//   }

//   // If user doesn't exist, create new user as CLIENT by default
//   return prisma.$transaction(async (tx) => {
//     const user = await tx.user.create({
//       data: {
//         email: userData.email,
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//         role: UserRole.CLIENT, // Default role for social login
//         authProvider: provider,
//         providerId: userData.providerId,
//         providerData: userData.providerData,
//         profileImage: userData.profileImage,
//       },
//     });

//     // Create client record
//     const client = await tx.client.create({
//       data: {
//         userId: user.id,
//       },
//     });

//     return { ...user, client };
//   });
// };

// // Google OAuth specific function
// export const verifyGoogleToken = async (token: string) => {
//   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     if (!payload) throw new Error("Invalid token");

//     return {
//       email: payload.email,
//       firstName: payload.given_name,
//       lastName: payload.family_name,
//       providerId: payload.sub,
//       providerData: payload,
//       profileImage: payload.picture,
//     };
//   } catch (error) {
//     throw new Error("Invalid Google token");
//   }
// };

// // Function to update user role after social login
// export const updateUserRole = async (
//   userId: string,
//   newRole: UserRole,
//   roleSpecificData: any
// ) => {
//   return prisma.$transaction(async (tx) => {
//     const user = await tx.user.findUnique({
//       where: { id: userId },
//       include: {
//         client: true,
//         lawyer: true,
//         staff: true,
//         admin: true,
//       },
//     });

//     if (!user) throw new Error("User not found");

//     // Delete existing role records
//     if (user.client) await tx.client.delete({ where: { userId } });
//     if (user.lawyer) await tx.lawyer.delete({ where: { userId } });
//     if (user.staff) await tx.staff.delete({ where: { userId } });
//     if (user.admin) await tx.admin.delete({ where: { userId } });

//     // Create new role record
//     let roleRecord;
//     switch (newRole) {
//       case UserRole.CLIENT:
//         roleRecord = await tx.client.create({ data: { userId } });
//         break;
//       case UserRole.LAWYER:
//         roleRecord = await tx.lawyer.create({
//           data: {
//             userId,
//             ...roleSpecificData,
//           },
//         });
//         break;
//       case UserRole.STAFF:
//         roleRecord = await tx.staff.create({
//           data: {
//             userId,
//             ...roleSpecificData,
//           },
//         });
//         break;
//       case UserRole.ADMIN:
//         roleRecord = await tx.admin.create({
//           data: {
//             userId,
//             ...roleSpecificData,
//           },
//         });
//         break;
//     }

//     // Update user role
//     const updatedUser = await tx.user.update({
//       where: { id: userId },
//       data: { role: newRole },
//       include: {
//         client: true,
//         lawyer: true,
//         staff: true,
//         admin: true,
//       },
//     });

//     return updatedUser;
//   });
// };
