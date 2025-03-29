import PageLayout from "../components/PageLayout";

export default function Page() {
    return (
      <PageLayout
        content={
          <div className="flex flex-col items-center text-white text-center pt-20 px-6">
            <p className="text-5xl md:font-bold mb-8 max-w-lg">
              Exciting Features Coming Soon!
            </p>
            <p className="text-2xl md:text-3xl font-semibold max-w-lg">
              We are working hard to bring you something amazing. Stay tuned for updates!
            </p>
          </div>
        }
      />
    );
  }
  