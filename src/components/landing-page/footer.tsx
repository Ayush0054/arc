import React from "react";

import Link from "next/link";

import { Button } from "../ui/button";
import { Github, Twitter, Facebook } from "lucide-react";
function Footer() {
  return (
    <footer className=" my-12 lg:mx-20 mx-4">
      <div>
        <div className=" flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <div className="flex gap-2 items-center">
            <Button variant="outline" size="icon">
              <Github />
            </Button>
            <Link
              target="__blank"
              href="https://github.com/Ayush0054/arc/blob/main/privacy-policy/privacy.md"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-muted-foreground">
            © Arc . All rights reserved. 2024-present.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
