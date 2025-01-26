import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
          <BreadcrumbItem key={link.name}>
            {index === links.length - 1 ? (
              <BreadcrumbPage>{link.name}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink href={link.href}>{link.name}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
