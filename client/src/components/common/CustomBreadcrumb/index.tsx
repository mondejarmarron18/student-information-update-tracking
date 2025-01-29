import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

type Props = {
  links: {
    name: string;
    href: string;
  }[];
};

const CustomBreadcrumb = ({ links }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <Fragment key={link.href}>
            <BreadcrumbItem>
              {index === links.length - 1 ? (
                <BreadcrumbPage>{link.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={link.href}>{link.name}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== links.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
