import MainNav from "@/components/MainNav";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Image from "next/image";

export default function About() {
  return (
    <>
      <main className="bg-white relative min-h-screen flex flex-col items-center py-24 gap-16">
        {/* Profile Image */}
        <figure className="flex h-[308px] items-center justify-center relative w-[300px] mb-10">
          <div className="flex-none rotate-[5.683deg]">
            <Image
              src="/portrait@2x.png"
              alt="Rafal Ziolek"
              width={250}
              height={200}
              className="bg-[50%_56.48%] bg-no-repeat object-cover"
              priority
            />
          </div>
        </figure>

        {/* About Content */}
        <div className="w-[440px] max-w-[90vw]">
          <List className="last:border-b-0">
            <ListItem label="Name:">Rafal Ziolek</ListItem>

            <ListItem label="Currently at:">
              <span>Docplanner</span>
              <div className="flex flex-row gap-1 items-center justify-center mt-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-green-600 text-xs font-medium leading-[1.5] tracking-[0.12px] text-right">
                  Open to new opportunities
                </span>
              </div>
            </ListItem>

            <ListItem label="Learning now:">
              <span>React Native</span>
              <span>Sewing clothes</span>
              <span>Viennoiserie</span>
            </ListItem>

            <ListItem label="I like:">
              <span>Star Wars</span>
              <span>To Pimp a Butterfly</span>
              <span>Cooking</span>
              <span>Bad bitches</span>
            </ListItem>

            <ListItem label="I don't like:">
              <span>Bad bitches</span>
              <span>OKRs</span>
            </ListItem>

            <ListItem label="Connect:" className="!border-b-0">
              <a
                href="https://x.com/rafalkziolek"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                x.com
              </a>
              <a
                href="https://www.instagram.com/rafal.ziolek/"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/rafalkziolek/"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="mailto:rafal.k.ziolek@gmail.com"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Email
              </a>
            </ListItem>
          </List>
        </div>
      </main>

      <MainNav />
    </>
  );
}
