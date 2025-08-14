
import { cn } from "@/app/lib/utils";
import {
  ElementType,
  ReactNode,
  ComponentPropsWithoutRef,
  forwardRef,
  Ref,
  JSX,
} from "react";

const variantClasses: Record<string, string> = {
  // Hero Section
  "hero-section-heading":
    "text-[26.5px] leading-[33.0px] md:text-[33.1px] md:leading-[39.7px] lg:text-[44.1px] lg:leading-[52.9px] lg2:text-[52px] lg2:leading-[61.9px] xl:text-[68.0px] xl:leading-[81.6px] 2xl:text-[86.1px] 2xl:leading-[103.3px]",
  "hero-body":
    "text-[17px] leading-auto md:text-[13.6px] md:leading-auto lg:text-[18.1px] lg:leading-auto lg2:text-[21.3px] lg2:leading-auto xl:text-[28.0px] xl:leading-auto 2xl:text-[35.4px] 2xl:leading-auto",
  "button":
    "text-[14.6px] leading-auto md:text-[17.5px] md:leading-auto lg:text-[23.3px] lg:leading-auto lg2:text-[27.3px] lg2:leading-auto xl:text-[36.0px] xl:leading-auto 2xl:text-[45.6px] 2xl:leading-auto",

  // Section
  "section-heading":
    "text-[24px] leading-auto md:text-[17.5px] md:leading-auto lg:text-[40px] lg:leading-auto  xl:text-[36.0px] xl:leading-auto 2xl:text-[45.6px] 2xl:leading-auto",
  "section-body":
    "text-[14px] leading-auto md:text-[13.6px] md:leading-auto lg:text-[20px] lg:leading-auto  xl:text-[24px] xl:leading-auto 2xl:text-[35.4px] 2xl:leading-auto",
    "section-card-heading":
    "text-[20px] lg2:text-3xl !font-medium xl:text-4xl mb-3 whitespace-pre-line",
    "section-card-body":
    "text-[12px] leading-auto md:text-[13.6px] md:leading-auto lg:text-[14px] lg:leading-auto lg2:text-[16px] lg2:leading-auto xl:text-[16.0px] xl:leading-auto 2xl:text-[35.4px] 2xl:leading-auto",

  // Grid View
  "grid-view-heading":
    "text-[20.5px] leading-auto md:text-[12.6px] lg:text-[20px] lg2:text-[28px] md:leading-auto xl:text-[26.0px] xl:leading-auto 2xl:text-[32.9px] 2xl:leading-auto",
  "grid-view-body":
    "text-[5.7px] leading-auto md:text-[6.8px] md:leading-auto lg:text-[12px] lg2:text-[16px] lg:leading-auto xl:text-[16.0px] xl:leading-auto 2xl:text-[17px] 2xl:leading-auto",
  "grid-view-body-hovered":
    "text-[4.9px] leading-auto md:text-[5.8px] md:leading-auto lg:text-[7.8px] lg:leading-auto lg2:text-[9.1px] lg2:leading-auto xl:text-[16.0px] xl:leading-auto 2xl:text-[15.2px] 2xl:leading-auto",

  // Card
  "card-heading":
    "text-[17.5px] leading-[21.0px] md:text-[20.9px] md:leading-[25.1px] lg:text-[27.9px] lg:leading-[33.5px] lg2:text-[32.7px] lg2:leading-[39.2px] xl:text-[43.1px] xl:leading-[51.7px] 2xl:text-[54.6px] 2xl:leading-[65.5px]",
  "card-body":
    "text-[6.9px] leading-[8.3px] md:text-[8.3px] md:leading-[10.0px] lg:text-[11.0px] lg:leading-[13.2px] lg2:text-[12.9px] lg2:leading-[15.5px] xl:text-[17.0px] xl:leading-[20.4px] 2xl:text-[21.5px] 2xl:leading-[25.8px]",

  // Slider
  "slider-heading":
    "text-[6.9px] leading-[8.3px] md:text-[8.3px] md:leading-[10.0px] lg:text-[11.0px] lg:leading-[13.2px] lg2:text-[20px] lg2:leading-[15.5px] xl:text-[20px] xl:leading-[20.4px] 2xl:text-[21.5px] 2xl:leading-[25.8px]",
  "slider-subtext":
    "text-[5.7px] leading-auto md:text-[6.8px] md:leading-auto lg:text-[9.1px] lg:leading-auto lg2:text-[10.6px] lg2:leading-auto xl:text-[14.0px] xl:leading-auto 2xl:text-[17.7px] 2xl:leading-auto",

  // Comparison Grid
  "comparison-grid-side-heading":
    "text-[17px]  leading-[10.0px] md:text-[10.0px] md:leading-[12.0px] lg:text-[13.3px] lg:leading-[16.0px] lg2:text-[15.6px] lg2:leading-[18.7px] xl:text-[20.5px] xl:leading-[24.6px] 2xl:text-[26.0px] 2xl:leading-[31.2px]",
    "comparison-grid-side-subheading":
    "text-[14px]  leading-[10.0px] md:text-[10.0px] md:leading-[12.0px] lg:text-[13.3px] lg:leading-[16.0px] lg2:text-[15.6px] lg2:leading-[18.7px] xl:text-[20px] xl:leading-[24.6px] 2xl:text-[26.0px] 2xl:leading-[31.2px]",
  "comparison-grid-body":
    "text-[10px] leading-auto md:text-[9.7px] md:leading-auto lg:text-[13.0px] lg:leading-auto lg2:text-[15.2px] lg2:leading-auto xl:text-[16px] xl:leading-auto 2xl:text-[25.3px] 2xl:leading-auto",

  // Footer
  "footer-navigation":
    "text-[5.7px] leading-auto md:text-[6.8px] md:leading-auto lg:text-[9.1px] lg:leading-auto lg2:text-[10.6px] lg2:leading-auto xl:text-[14.0px] xl:leading-auto 2xl:text-[17.7px] 2xl:leading-auto",
  "footer-micro-text":
    "text-[4.9px] leading-auto md:text-[5.8px] md:leading-auto lg:text-[7.8px] lg:leading-auto lg2:text-[9.1px] lg2:leading-auto xl:text-[12.0px] xl:leading-auto 2xl:text-[15.2px] 2xl:leading-auto",
};


// 🔠 Semantic Tag Mapping
const semanticTags: Record<string, ElementType> = {
  "hero-section-heading": "h1",
  "section-heading": "h2",
  "grid-view-heading": "h3",
  "card-heading": "h3",
  "slider-heading": "h4",
  "comparison-grid-side-heading": "h4",
  "footer-navigation": "nav",
  "footer-micro-text": "small",
  // fallback: all others → <p>
};

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: keyof typeof variantClasses;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "variant">;

export const Typography = forwardRef(function Typography<T extends ElementType>(
  { as, variant = "section-body", className, children, ...props }: TypographyProps<T>,
  ref: Ref<any>
): JSX.Element {
  const Component = as || semanticTags[variant] || "p";

  return (
    <Component
      ref={ref}
      className={cn(
        "font-['Helvetica_Neue','Helvetica','Arial','sans-serif']",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}) as <T extends ElementType>(
  props: TypographyProps<T> & { ref?: Ref<any> }
) => JSX.Element;
