"use client";

import { useEffect, useRef, useState } from "react";

import { Download, X } from "lucide-react";

import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

type Profile = {
  name?: string | null;
  role?: string | null;
  summaryEn?: string | null;
  summaryId?: string | null;
  email?: string | null;
  github?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  photoUrl?: string | null;
  cvEnUrl?: string | null;
  cvIdUrl?: string | null;
};

type Skill = {
  id: string;
  name: string;
  imageUrl: string;
};

type HomeClientProps = {
  profile: Profile | null;
  skills?: Skill[];
};

const getDownloadUrl = (url?: string | null, filename?: string) => {
  if (!url) {
    return "#";
  }

  if (!filename) {
    return url;
  }

  if (!url.includes("/upload/")) {
    return url;
  }

  const encodedFilename = encodeURIComponent(filename);

  const attachmentRegex = /\/upload\/fl_attachment(?::[^/]+)?\//;

  if (attachmentRegex.test(url)) {
    return url.replace(
      attachmentRegex,
      `/upload/fl_attachment:${encodedFilename}/`,
    );
  }

  return url.replace("/upload/", `/upload/fl_attachment:${encodedFilename}/`);
};

export default function HomeClient({ profile, skills = [] }: HomeClientProps) {
  const [lang, setLang] = useState<"EN" | "ID">("EN");

  const handleHireMe = () => {
    const email = profile?.email || "ramddbgk@gmail.com";

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(email)}` +
      `&su=${encodeURIComponent("Hiring Inquiry")}` +
      `&body=${encodeURIComponent(
        `Hi Ilham,

I would like to discuss a job opportunity with you.

Best regards,`,
      )}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  const [showCvDialog, setShowCvDialog] = useState(false);

  const carouselViewportRef = useRef<HTMLDivElement>(null);

  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const animationFrameRef = useRef<number | null>(null);

  const positionRef = useRef(0);

  const cycleWidthRef = useRef(0);

  const cvEnDownloadUrl = "/api/download-cv?type=en";
  const cvIdDownloadUrl = "/api/download-cv?type=id";

  useEffect(() => {
    const track = carouselTrackRef.current;

    if (!track || skills.length <= 1) {
      return;
    }

    let cancelled = false;

    const SPEED = 0.38;

    const calculateCycleWidth = () => {
      if (!track) {
        return;
      }

      const children = Array.from(track.children);

      if (children.length < skills.length * 2) {
        return;
      }

      const firstSecondSetCard = children[skills.length] as HTMLElement;

      if (!firstSecondSetCard) {
        return;
      }

      cycleWidthRef.current = firstSecondSetCard.offsetLeft;
    };

    const update = () => {
      if (cancelled) {
        return;
      }

      if (cycleWidthRef.current <= 0) {
        calculateCycleWidth();
      }

      positionRef.current += SPEED;

      const cycleWidth = cycleWidthRef.current;

      if (cycleWidth > 0 && positionRef.current >= cycleWidth) {
        positionRef.current -= cycleWidth;
      }

      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;

      animationFrameRef.current = requestAnimationFrame(update);
    };

    const handleResize = () => {
      calculateCycleWidth();
    };

    requestAnimationFrame(() => {
      calculateCycleWidth();

      animationFrameRef.current = requestAnimationFrame(update);
    });

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener("resize", handleResize);

      if (track) {
        track.style.transform = "translate3d(0, 0, 0)";
      }
    };
  }, [skills]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC] font-sans text-zinc-900">
      <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF4FF]">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="
              absolute
              -right-[10%]
              -top-40
              h-[500px]
              w-[500px]
              rounded-full
              bg-blue-100/40
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              -bottom-[20%]
              -left-[10%]
              h-[450px]
              w-[450px]
              rounded-full
              bg-blue-50/50
              blur-[120px]
            "
          />
        </div>

        <div
          className="
            absolute
            right-5
            top-5
            z-30
            sm:right-8
            sm:top-8
            lg:right-12
            lg:top-8
          "
        >
          <div
            className="
              flex
              items-center
              rounded-full
              border
              border-zinc-200
              bg-white/80
              p-1
              shadow-sm
              backdrop-blur-xl
            "
          >
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={`
                rounded-full
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                transition-all
                sm:px-4
                sm:text-xs
                ${
                  lang === "EN"
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900"
                }
              `}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => setLang("ID")}
              className={`
                rounded-full
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                transition-all
                sm:px-4
                sm:text-xs
                ${
                  lang === "ID"
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900"
                }
              `}
            >
              ID
            </button>
          </div>
        </div>

        <div
          className="
            relative
            mx-auto
            flex
            min-h-[100svh]
            w-full
            max-w-[1500px]
            items-center
            px-6
            py-24
            sm:px-10
            md:px-12
            lg:px-16
            xl:px-20
          "
        >
          <div
            className="
              grid
              w-full
              grid-cols-1
              items-center
              lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.8fr)]
              lg:gap-8
              xl:grid-cols-[1fr_0.82fr]
            "
          >
            <div className="relative z-20 max-w-3xl">
              <div
                className="
                  mb-7
                  flex
                  items-center
                  gap-4
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-zinc-500
                  sm:text-xs
                "
              >
                <span className="h-[2px] w-9 bg-[#2563EB]" />

                {profile?.role || "Fullstack Web Developer"}
              </div>

              <h1
                className="
                  max-w-[900px]
                  text-[clamp(3rem,7vw,6rem)]
                  font-extrabold
                  leading-[0.92]
                  tracking-[-0.045em]
                  text-zinc-950
                "
              >
                I'm{" "}
                <span className="text-[#2563EB]">
                  {profile?.name || "Ilham Ramadhana Hartono"}
                </span>
              </h1>

              <p
                className="
                  mt-8
                  max-w-2xl
                  text-base
                  leading-7
                  text-zinc-600
                  sm:text-lg
                  sm:leading-8
                "
              >
                {lang === "EN"
                  ? profile?.summaryEn ||
                    "An Informatics Engineering graduate with a background in Information Technology and experience in software development and maintenance."
                  : profile?.summaryId ||
                    "Lulusan Teknik Informatika dengan latar belakang di bidang Teknologi Informasi dan pengalaman dalam pengembangan serta pemeliharaan perangkat lunak."}
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  gap-3
                  sm:mt-9
                  sm:gap-4
                "
              >
                <button
                  type="button"
                  onClick={() => setShowCvDialog(true)}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    border-2
                    border-[#2563EB]
                    bg-[#2563EB]
                    px-6
                    py-3.5
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                    transition-colors
                    hover:bg-[#1D4ED8]
                    sm:px-7
                    sm:py-4
                    sm:text-sm
                  "
                >
                  <Download size={17} />
                  Download CV
                </button>

                <button
                  type="button"
                  onClick={handleHireMe}
                  className="
    inline-flex
    items-center
    justify-center
    border-2
    border-[#2563EB]
    bg-transparent
    px-7
    py-3.5
    text-xs
    font-bold
    uppercase
    tracking-wide
    text-[#2563EB]
    transition-colors
    hover:bg-[#2563EB]
    hover:text-white
    sm:px-8
    sm:py-4
    sm:text-sm
  "
                >
                  Hire Me
                </button>
              </div>

              <div
                className="
                  mt-8
                  flex
                  items-center
                  gap-6
                  text-zinc-500
                "
              >
                {profile?.instagram && (
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="transition-colors hover:text-[#2563EB]"
                  >
                    <FaInstagram size={19} />
                  </a>
                )}

                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="transition-colors hover:text-[#2563EB]"
                  >
                    <FaLinkedin size={19} />
                  </a>
                )}

                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="transition-colors hover:text-[#2563EB]"
                  >
                    <FaGithub size={19} />
                  </a>
                )}
              </div>
            </div>

            {profile?.photoUrl && (
              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  right-[-5%]
                  hidden
                  h-[92%]
                  w-[43%]
                  items-end
                  justify-end
                  lg:flex
                  xl:right-[-2%]
                "
              >
                <div className="relative h-full w-full">
                  <img
                    src={profile.photoUrl}
                    alt={profile.name || "Profile"}
                    className="
                      absolute
                      bottom-0
                      right-0
                      h-full
                      w-auto
                      max-w-none
                      object-contain
                      object-bottom
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      h-36
                      bg-gradient-to-t
                      from-[#F8FAFC]
                      via-[#F8FAFC]/70
                      to-transparent
                    "
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {skills.length > 0 && (
        <section
          className="
            relative
            overflow-hidden
            bg-[#EAF1FB]
            py-20
            sm:py-24
            lg:py-28
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1500px]
              px-6
              sm:px-10
              md:px-12
              lg:px-16
              xl:px-20
            "
          >
            <div className="max-w-3xl">
              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-4
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-zinc-500
                  sm:text-xs
                "
              >
                <span className="h-[2px] w-9 bg-[#2563EB]" />
                Skills
              </div>

              <h2
                className="
                  text-4xl
                  font-extrabold
                  tracking-[-0.04em]
                  text-zinc-950
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Technologies I work with.
              </h2>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-7
                  text-zinc-600
                  sm:text-lg
                "
              >
                A collection of technologies, frameworks, and tools I use to
                build digital products.
              </p>
            </div>
          </div>

          <div
            className="
              mx-auto
              mt-12
              w-full
              max-w-[1500px]
              px-6
              sm:px-10
              md:px-12
              lg:px-16
              xl:px-20
            "
          >
            <div
              ref={carouselViewportRef}
              className="
                relative
                w-full
                overflow-hidden
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  z-20
                  w-20
                  bg-gradient-to-r
                  from-[#EAF1FB]
                  via-[#EAF1FB]/80
                  to-transparent
                  sm:w-28
                  lg:w-36
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  right-0
                  z-20
                  w-20
                  bg-gradient-to-l
                  from-[#EAF1FB]
                  via-[#EAF1FB]/80
                  to-transparent
                  sm:w-28
                  lg:w-36
                "
              />

              <div
                ref={carouselTrackRef}
                className="
                  flex
                  w-max
                  items-stretch
                  gap-5
                  will-change-transform
                  sm:gap-6
                "
                style={{
                  transform: "translate3d(0, 0, 0)",
                }}
              >
                {[...skills, ...skills, ...skills].map((skill, index) => (
                  <article
                    key={`${skill.id}-${index}`}
                    className="
                        group
                        relative
                        flex
                        h-[310px]
                        w-[240px]
                        shrink-0
                        flex-col
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-white/70
                        bg-white/40
                        p-5
                        shadow-[0_20px_60px_rgba(37,99,235,0.08)]
                        backdrop-blur-2xl
                        sm:h-[330px]
                        sm:w-[260px]
                        sm:rounded-[26px]
                      "
                  >
                    <div
                      className="
                          relative
                          flex
                          min-h-0
                          flex-1
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-[18px]
                          border
                          border-white/70
                          bg-white/45
                          p-7
                          backdrop-blur-xl
                          sm:rounded-[20px]
                        "
                    >
                      <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-br
                            from-white/50
                            via-transparent
                            to-blue-100/10
                          "
                      />

                      <img
                        src={skill.imageUrl}
                        alt={skill.name}
                        draggable={false}
                        className="
                            relative
                            z-10
                            h-36
                            w-36
                            select-none
                            object-contain
                            transition-transform
                            duration-500
                            ease-out
                            group-hover:scale-[1.08]
                            sm:h-40
                            sm:w-40
                          "
                      />
                    </div>

                    <div
                      className="
                          flex
                          h-14
                          shrink-0
                          items-center
                          justify-center
                        "
                    >
                      <p
                        className="
                            text-center
                            text-sm
                            font-bold
                            text-zinc-800
                            sm:text-base
                          "
                      >
                        <span className="mr-2 text-[#2563EB]">•</span>

                        {skill.name}

                        <span className="ml-2 text-[#2563EB]">•</span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {showCvDialog && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-zinc-950/40
            p-4
            backdrop-blur-md
          "
          onClick={() => setShowCvDialog(false)}
        >
          <div
            className="
              w-full
              max-w-md
              border
              border-white/60
              bg-white/75
              p-7
              shadow-2xl
              backdrop-blur-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="
                mb-7
                flex
                items-start
                justify-between
                gap-5
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#2563EB]
                  "
                >
                  Curriculum Vitae
                </p>

                <h3
                  className="
                    mt-1
                    text-2xl
                    font-extrabold
                    text-zinc-900
                  "
                >
                  Download CV
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCvDialog(false)}
                aria-label="Close"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  border-2
                  border-zinc-300
                  bg-white/60
                  text-zinc-700
                  transition-colors
                  hover:border-[#2563EB]
                  hover:bg-[#2563EB]
                  hover:text-white
                "
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-3">
              {profile?.cvEnUrl && (
                <a
                  href={cvEnDownloadUrl}
                  className="
    flex
    w-full
    items-center
    justify-center
    gap-3
    border-2
    border-[#2563EB]
    bg-[#2563EB]
    px-6
    py-4
    text-sm
    font-bold
    uppercase
    tracking-wide
    text-white
    transition-colors
    hover:bg-[#1D4ED8]
  "
                >
                  <Download size={18} />
                  English CV
                </a>
              )}

              {profile?.cvIdUrl && (
                <a
                  href={cvIdDownloadUrl}
                  className="
    flex
    w-full
    items-center
    justify-center
    gap-3
    border-2
    border-[#2563EB]
    bg-white/60
    px-6
    py-4
    text-sm
    font-bold
    uppercase
    tracking-wide
    text-[#2563EB]
    transition-colors
    hover:bg-[#2563EB]
    hover:text-white
  "
                >
                  <Download size={18} />
                  Indonesia CV
                </a>
              )}

              {!profile?.cvEnUrl && !profile?.cvIdUrl && (
                <p
                  className="
                      border
                      border-zinc-200
                      bg-white/60
                      p-5
                      text-center
                      text-sm
                      text-zinc-500
                    "
                >
                  CV belum tersedia.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
