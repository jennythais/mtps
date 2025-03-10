import Link from "next/link";
import { Button } from "@mui/material";
export default function Homepage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">
            University Training Point System
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="outlined"
                sx={{ color: "black", borderColor: "black" }}
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-30 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to University Training Point System
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Manage training activities and track student progress
                  efficiently
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button
                    variant="contained"
                    sx={{ color: "white", backgroundColor: "black" }}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-20 lg:py-30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm text-center">
                <h3 className="text-lg font-bold">For Faculties</h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage activities, track student progress, and
                  assign training points.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm text-center">
                <h3 className="text-lg font-bold">For Students</h3>
                <p className="text-sm text-muted-foreground">
                  Join activities, take tests, and track your training points.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} University Training Point System.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
