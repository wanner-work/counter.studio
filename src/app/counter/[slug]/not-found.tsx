import Container from "@/components/layout/Container";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function NotFound () {
  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            no counter found with that id
          </h2>
          <p className="text-gray-500 max-w-[80%]">
            the counter you are looking for does not exist. please check the url and try again.
          </p>
        </div>

        <Link href={'/'}>
          <button className="px-4 py-3 bg-white text-black font-bold flex justify-between items-center gap-2">
            <span>
              home
            </span>
            <span className="ml-2">
              <ArrowRightIcon className="w-6 h-6 text-black" />
            </span>
          </button>
        </Link>
      </div>
    </Container>
  )
}
