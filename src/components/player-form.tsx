import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function PlayerForm({}) {
  const players = useStore((state) => state.players);
  const addPlayer = useStore((state) => state.addPlayer);
  const removePlayer = useStore((state) => state.removePlayer);

  const playerSchema = z
    .object({
      player: z
        .string()
        .min(1, "name cannot be empty")
        .max(20, "name cannot have more than 20 characters"),
    })
    .superRefine((val, ctx) => {
      if (players.includes(val.player)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "cannot have duplicate names",
          path: ["player"],
        });
      }
    });

  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      player: "",
    },
  });

  const onSubmit = ({ player }: z.infer<typeof playerSchema>) => {
    addPlayer(player);
    form.reset({
      player: "",
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form className="flex gap-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="player"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="enter a name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">add to game</Button>
        </form>
      </Form>
      {players.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {players.map((player) => (
            <Badge key={player}>
              {player}
              <XIcon
                className="ml-1 h-4 w-4 cursor-pointer"
                onClick={() => removePlayer(player)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
