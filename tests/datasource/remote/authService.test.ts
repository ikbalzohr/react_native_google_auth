import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { AuthenticationError } from "@/lib/common/failure";
import { googleSignIn, googleSignOut } from "@/lib/data/datasources/remote/authService";

jest.mock("@react-native-google-signin/google-signin", () => {
  return {
    GoogleSignin: {
      hasPlayServices: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
    },
    statusCodes: {
      SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
      IN_PROGRESS: "IN_PROGRESS",
      PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE",
    },
  };
});

describe("Google Sign-In Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should sign in successfully", async () => {
    const mockUserInfo = { user: { id: "123", name: "Test User" } };
    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    (GoogleSignin.signIn as jest.Mock).mockResolvedValue(mockUserInfo);

    const result = await googleSignIn();
    expect(result).toEqual(mockUserInfo);
  });

  test("should handle sign in cancelled", async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    (GoogleSignin.signIn as jest.Mock).mockRejectedValue({ code: statusCodes.SIGN_IN_CANCELLED });

    await expect(googleSignIn()).rejects.toThrow(AuthenticationError);
  });

  test("should handle sign in in progress", async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    (GoogleSignin.signIn as jest.Mock).mockRejectedValue({ code: statusCodes.IN_PROGRESS });

    await expect(googleSignIn()).rejects.toThrow(AuthenticationError);
  });

  test("should handle Play Services not available", async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    (GoogleSignin.signIn as jest.Mock).mockRejectedValue({ code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE });

    await expect(googleSignIn()).rejects.toThrow(AuthenticationError);
  });

  describe("googleSignOut", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should sign out successfully", async () => {
      (GoogleSignin.signOut as jest.Mock).mockResolvedValue(true);

      await googleSignOut();

      expect(GoogleSignin.signOut).toHaveBeenCalled();
    });

    it("should throw an AuthenticationError when sign out fails", async () => {
      (GoogleSignin.signOut as jest.Mock).mockRejectedValue(new Error("Sign out failed"));
      await expect(googleSignOut()).rejects.toThrow(AuthenticationError);
    });
  });
});
