export type Specialization = {
  id: string;
  name: string;
  description: string;
};

const specializations: Specialization[] = [
  {
    id: "1",
    name: "Business Informatics",
    description:
      "Integrates IT with business strategies to streamline operations, enhance decision making and provide analytical insights. Students in this specialization will learn to analyze business needs and apply cutting edge technology to solve complex business problems.",
  },
  {
    id: "2",
    name: "Systems Development",
    description:
      "Focuses on software design, advanced programming, and the development of cloud-based systems. It also introduces students to game development, combining creative and technical skills for creating interactive experiences.",
  },
  {
    id: "3",
    name: "Digital Arts",
    description:
      "Eemphasizes creativity and technical skills in visual storytelling, drawing, and animation. Students will learn how to create engaging digital content and animations for various media, from film to games and beyond.",
  },
  {
    id: "4",
    name: "Computer Security",
    description:
      "Equips students with the necessary skills to protect computer systems and networks from malicious threats. Students will learn how to identify vulnerabilities, defend against cyber-attacks, and conduct forensic investigations.",
  },
];

export default specializations;
