import fs from "fs";
import path from "path";

import { ClockIcon } from "@phosphor-icons/react/dist/ssr";
import { ImageResponse } from "next/og";

import { recipeDirectory } from "@/config";
import { parseRecipe } from "@/services/markdown";
import { formatDurationString } from "@/utils/duration/formatDurationString";

export const alt = "Brouwerij Geel recept";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () =>
  fs
    .readdirSync(recipeDirectory)
    .map((fileName) => ({ slug: fileName.replace(".md", "") }));

const toDataUrl = (publicPath: string) => {
  const file = fs.readFileSync(path.join(process.cwd(), "public", publicPath));

  return `data:image/jpeg;base64,${file.toString("base64")}`;
};

const logoDataUrl = () => {
  const svg = fs
    .readFileSync(
      path.join(process.cwd(), "public/images/brouwerij-geel-logo.svg"),
      "utf-8",
    )
    .replace("currentColor", "#ffffff");

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};

const readFont = (fileName: string) =>
  fs.readFileSync(
    path.join(process.cwd(), "src/app/recept/[slug]/fonts", fileName),
  );

const Image = async ({ params }: Props) => {
  const { slug } = await params;
  const { metadata } = parseRecipe(
    fs.readFileSync(`${recipeDirectory}/${slug}.md`, "utf-8"),
  );
  const duration = formatDurationString(metadata.duration);

  return new ImageResponse(
    <div
      tw="relative flex h-full w-full bg-[#ede8e1] text-white"
      style={{ fontFamily: "Bricolage Grotesque" }}
    >
      <img
        alt=""
        src={toDataUrl(metadata.imageSlug)}
        width={size.width}
        height={size.height}
        tw="absolute left-0 top-0"
        style={{ objectFit: "cover" }}
      />
      <div
        tw="absolute inset-0 flex"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0) 35%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85))",
        }}
      />
      <div tw="absolute left-16 top-12 flex">
        <img src={logoDataUrl()} width={140} height={87} alt="Brouwerij Geel" />
      </div>
      <div tw="absolute bottom-14 left-16 right-16 flex flex-col">
        <div tw="flex text-[68px] font-bold leading-[1.1]">
          {metadata.title}
        </div>
        {duration && (
          <div
            tw="mt-5 flex items-center text-3xl font-normal text-[#cbc8c3]"
            style={{ fontFamily: "DM Sans" }}
          >
            <ClockIcon weight="fill" size={34} color="#cbc8c3" />
            <span tw="ml-3">{duration}</span>
          </div>
        )}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: readFont("BricolageGrotesque-Bold.ttf"),
          weight: 700,
          style: "normal",
        },
        {
          name: "DM Sans",
          data: readFont("DMSans-Regular.ttf"),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
};

export default Image;
