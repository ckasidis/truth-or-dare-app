import { type Mode } from "@/types/tod";
import { useStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ModeForm({}) {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  const onValueChange = (value: string) => {
    setMode(value as Mode);
  };

  return (
    <RadioGroup
      value={mode}
      onValueChange={onValueChange}
      className="space-y-1.5"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="tod" id="tod" />
        <Label htmlFor="tod" className="flex-1 cursor-pointer">
          Truth or Dare
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="truth" id="truth" />
        <Label htmlFor="truth" className="flex-1 cursor-pointer">
          Truth
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="dare" id="dare" />
        <Label htmlFor="dare" className="flex-1 cursor-pointer">
          Dare
        </Label>
      </div>
    </RadioGroup>
  );
}
