import SortButton from "./SortButton";
import ViewToggle from "./ViewButton";

export const ViewOptions = () => (
    <div className="ml-auto flex items-center gap-1">
        <ViewToggle />
        <SortButton />
    </div>
)