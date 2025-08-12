type GSensorProps = {
  highlightedText?: string;
  heading?: string;
  subheading?: string;
  style?: string;
};

export default function GSensor({ highlightedText, heading, subheading, style }: GSensorProps) {
  return (
    <>
      <main className={`min-h-screen w-full ${style} px-6 pb-12 sm:pb-22`}>
        <div className="text-center space-y-4 max-w-3xl">
          <p className="text-[16px] font-bold text-[#AD2239] tracking-wide">{highlightedText}</p>
          <h1 className="text-[48px] font-medium text-white">{heading}</h1>
          <p className="text-[16px] w-[400px] mx-auto text-gray-400 leading-snug px-9">{subheading}</p>
        </div>
      </main>
    </>
  );
}
