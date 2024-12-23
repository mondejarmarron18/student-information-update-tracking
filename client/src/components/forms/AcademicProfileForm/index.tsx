import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AcademicProfileFormProps } from "./schema";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";
import useAcademicProfileForm from "./useAcademicProfileForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import allSpecializations, { Specialization } from "@/constants/specialization";
import courseSpecializations from "@/constants/courseSpecializations";

const AcademicProfileForm = (props: FormProps<AcademicProfileFormProps>) => {
  const { form } = useAcademicProfileForm();
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const course = form.watch("course");

  useEffect(() => {
    const result = courseSpecializations.filter((courseSpecialization) => {
      return courseSpecialization.courseId === course;
    });

    const _specializations = allSpecializations.filter((specialization) => {
      return result.some((courseSpecialization) => {
        return courseSpecialization.specializationId === specialization.id;
      });
    });

    setSpecializations(_specializations);
  }, [course]);

  const onSubmit = (values: AcademicProfileFormProps) => {
    props.onSubmit(values);
  };

  const RenderSpecializationInfo = () => {
    return (
      <div className="flex flex-col gap-2 bg-gray-500/10 p-4 rounded-lg mb-6">
        <h2 className="font-bold">Specialization</h2>
        <div>
          1. <b>Business Informatics</b> integrates IT with business strategies
          to streamline operations, enhance decision making and provide
          analytical insights. Students in this specialization will learn to
          analyze business needs and apply cutting edge technology to solve
          complex business problems. <b>Focus Areas:</b> Business Analysis for
          IT, Applied Analytics in Business for IT, and Intelligent Systems Job
          Opportunities: Business Analyst, Data Analyst, Systems Analyst, IT
          Consultant, Business Intelligence Specialist{" "}
        </div>
        <div>
          2. <b>Systems Development</b> focuses on software design, advanced
          programming, and the development of cloud-based systems. It also
          introduces students to game development, combining creative and
          technical skills for creating interactive experiences.
          <br />
          <b>Focus Areas:</b>
          Advanced Programming, Cloud Computing, and Game Development Job
          Opportunities: Software/Software Developer, Cloud Solutions Architect,
          Application Developer, Cloud Engineer
        </div>
        <div>
          3. <b>Digital Arts</b> emphasizes creativity and technical skills in
          visual storytelling, drawing, and animation. Students will learn how
          to create engaging digital content and animations for various media,
          from film to games and beyond.
          <br />
          <b>Focus Areas:</b> Freehand and Digital Drawing, Script Writing and
          Storyboard Design, 3D Animation, and Clean-up and in-between for IT
          Job Opportunities: Animator, Digital Illustrator, Storyboard Artist,
          Visual Effects Artist, Digital Content Creator, Graphics Designer
        </div>
        <div>
          4. <b>Computer Security</b> equips students with the necessary skills
          to protect computer systems and networks from malicious threats.
          Students will learn how to identify vulnerabilities, defend against
          cyber-attacks, and conduct forensic investigations.
          <br />
          <b>Focus Areas:</b> Network Security, Computer Forensics, and Ethical
          Hacking Job Opportunities: Cybersecurity Analyst, Ethical
          Hacker/Penetration Tester, Network Security Engineer, Forensics
          Investigator, Information Security Consultant
        </div>

        <div>
          Note: For <b>1st and 2nd year</b> level you may include Digital Arts
          and Computer Security as option in your planned electives.
        </div>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", props.className)}
      >
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                {formField.name === "specialization" && (
                  <RenderSpecializationInfo />
                )}
                <FormLabel>{formField.label}</FormLabel>

                {formField.type !== "select" ? (
                  <FormControl>
                    <Input placeholder={formField.placeholder} {...field} />
                  </FormControl>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={formField.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    {formField.name === "specialization" ? (
                      <SelectContent>
                        {specializations.map((specialization) => (
                          <SelectItem
                            key={specialization.id}
                            value={specialization.id}
                          >
                            {specialization.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    ) : (
                      <SelectContent>
                        {formField.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">{props.onSubmitLabel || "Submit"}</Button>
      </form>
    </Form>
  );
};

export default AcademicProfileForm;
