import {Counter} from "@/types/Counter.types"
import ShortNumber from "@/components/basic/ShortNumber"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import RelativeTime from "@/components/basic/RelativeTime";
import Link from "next/link";

dayjs.extend(relativeTime)

export default function SavedCounter({id, count, title, modified}: Counter) {
    console.log('count', count)

    return (
        <Link href={`/counter/${id}`}>
            <div className="grid grid-cols-saved-counter gap-4 p-5 bg-gray-500/10 border border-gray-300/10">
                <div className="grid place-items-center">
                    <p className="font-bold text-[20px]"><ShortNumber number={parseInt(count as unknown as string)}/>
                    </p>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold truncate mb-[2px]">{title}</h3>
                    <span className="text-gray-600 text-sm italic">updated <RelativeTime date={modified}/></span>
                </div>
                <div>
                </div>
            </div>
        </Link>
    )
}
