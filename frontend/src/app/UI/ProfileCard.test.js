import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileCard from "./ProfileCard";
import { getUserById } from "app/api";

jest.mock("app/api", () => ({
  getUserById: jest.fn(),
  updateUserById: jest.fn().mockResolvedValue({}),
}));

const activeUser = {
  id: 1,
  username: "testuser",
  email: "testuser@example.com",
  createdAt: "10 October 23",
};

describe("ProfileCard", () => {
  // Set up user data before each test
  beforeEach(() => {
    getUserById.mockResolvedValue({ data: activeUser });
  });
  /*
    This test verifies that the ProfileCard component correctly displays the user's information, 
    including their username, email, date of joining and is in sync with the provided 
    activeUser prop.
    */
  test("displays user info", async () => {
    render(<ProfileCard activeUser={activeUser} />);

    // Ensure the user info is displayed
    expect(
      screen.getByText(`Username: ${activeUser.username}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Email: ${activeUser.email}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Date Joined: ${activeUser.createdAt}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Password: ********")).toBeInTheDocument();
  });
});
