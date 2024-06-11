import sha256 from "js-sha256";

export const TestUsers = [
  {
    email: "s3718165@student.rmit.edu.au",
    username: "chris-santamaria",
    password: sha256("password"),
  },
];
