import { hash } from "bcryptjs";

import { prisma } from "../prisma";

async function create() {
  await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@rentalx.com",
      password: await hash("admin", 8),
      driver_license: "1234565",
      isAdmin: true,
    },
  });
}

create().then(() => console.log("Admin User Created!"));
