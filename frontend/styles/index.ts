const styles = {
  innerWidth: "2xl:max-w-[1440px] w-full",
  interWidth: "lg:w-[80%] w-[100%]",

  // Width and Height
  GoodChildDimensions: "w-full h-full",

  // Border Radius utilities
  sectionsBorderRadius: "rounded-lg overflow-hidden",

  // Padding utilities
  padding: "p-4 sm:p-6 lg:p-8",
  horizontalPadding: "px-4 sm:px-6 lg:px-8",
  verticalPadding: "py-4 sm:py-6 lg:py-8",
  topPadding: "pt-4 sm:pt-6 lg:pt-8",
  bottomPadding: "pb-4 sm:pb-6 lg:pt-8",
  leftPadding: "pl-4 sm:pl-6 lg:pl-8",
  rightPadding: "pr-4 sm:pr-6 lg:pr-8",
  GrandFatherPadding: "",
  headerPadding: "p-4 md:p-4",
  chatHeaderPadding: "p-1 sm:p-2 lg:p-2",

  flexCenter: "flex justify-center items-center",
  flexCenterStart: "flex justify-center items-start",
  flexBetweenStart: "flex justify-between items-start",
  flexBetween: "flex justify-between items-center",
  flexBetweenEnd: "flex justify-between items-end",
  flexStart: "flex justify-start items-start",
  flexEnd: "flex justify-end",
  flexEndCenter: "flex justify-end items-center",

  // hero section
  heroHeading:
    "scroll-m-20 text-4xl sm:text-5xl md:text-6xl tracking-tight text-balance",

  // Typography
  H1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
  H2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-balance",
  H3: "scroll-m-20 text-2xl font-semibold tracking-tight text-balance",
  H4: "scroll-m-20 text-xl font-semibold tracking-tight text-balance",
  p: " text-sm sm:text-base leading-7 [&:not(:first-child)]:my-3 text-balance",
  large: "text-lg font-semibold",
  small: "text-sm leading-none font-medium",
  Xsmall: "text-xs leading-none font-medium",

  // Additional typography utilities
  lead: "text-muted-foreground text-xl",
  muted: "text-muted-foreground text-sm",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  code: "relative text-base ",
  inlineCode:
    "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  list: "md:my-6 my-3 md:ml-6 ml-3 list-disc [&>li]:mt-2",

  // Table styles based on shadcn/ui table component
  table: "w-full caption-bottom text-sm",
  tableHeader: "border-b",
  tableBody: "[&_tr:last-child]:border-0",
  tableFooter: "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
  tableRow:
    "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
  tableHead:
    "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
  tableCell: "p-4 align-middle [&:has([role=checkbox])]:pr-0",
  tableCaption: "mt-4 text-sm text-muted-foreground",
};

export default styles;
