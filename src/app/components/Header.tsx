import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import React from "react";

const Header = async () => {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await getUser();

  // Get the URL to redirect the user to AuthKit to sign in
  const signInUrl = await getSignInUrl();

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  /**
   * If a signed-in user is mandatory, you can use the `ensureSignedIn`
   * configuration option. If logged out, the below will immediately redirect
   * the user to AuthKit. After signing in, the user will automatically
   * be redirected back to this page.
   * */
  // const { user } = await getUser({ ensureSignedIn: true });

  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href="/" className="font-bold text-xl">
          Job Portal
        </Link>
        <nav className="flex gap-2">
          {!user && (
            <Link
              href={signInUrl}
              className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4"
            >
              Login
            </Link>
          )}
          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4">
                LogOut
              </button>
            </form>
          )}
          <Link
            href="/new-listing"
            className="rounded-md py-1 px-2 sm:py-2 sm:px-4 text-white bg-blue-600"
          >
            post a Job
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
