export const site = {
  name: "Aashish Timalsina",
  role: "Full Stack Developer",
  headline: "Full Stack Developer from Nepal",
  summary: "5+ Years Experience Building Scalable Web Solutions",
  email: "tm.aashish1@gmail.com",
  phone: "9848077880",
  github: "https://github.com/aashishtimalsina",
  url: "https://aashishtimalsina.com.np",
  locale: "en_NP",
} as const;

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

