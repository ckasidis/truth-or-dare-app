import { type Rating } from "@/types/tod";
import { useStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RatingForm({}) {
  const rating = useStore((state) => state.rating);
  const setRating = useStore((state) => state.setRating);

  const onValueChange = (value: string) => {
    setRating(value as Rating);
  };

  return (
    <RadioGroup
      value={rating}
      onValueChange={onValueChange}
      className="space-y-1.5"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="pg" id="pg" />
        <Label htmlFor="pg" className="flex-1 cursor-pointer">
          PG
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="pg13" id="pg13" />
        <Label htmlFor="pg13" className="flex-1 cursor-pointer">
          PG-13
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="r" id="r" />
        <Label htmlFor="r" className="flex-1 cursor-pointer">
          R
        </Label>
      </div>
    </RadioGroup>
  );
}
