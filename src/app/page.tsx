"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CogIcon,
  FlameIcon,
  HelpCircleIcon,
  RotateCcwIcon,
  Trash2Icon,
  Undo2Icon,
  UserIcon,
  Users2Icon,
  WrenchIcon,
} from "lucide-react";

import { type Mode, type Question, type Rating } from "@/types/tod";
import { RatingForm } from "@/components/rating-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { ModeForm } from "../components/mode-form";
import { PlayerForm } from "../components/player-form";
import { useStore } from "../lib/store";

const fetchTruthOrDare = async (mode: Mode, rating: Rating) => {
  const res = await fetch(`/api/question/${mode}?rating=${rating}`);
  return res.json();
};

export default function GamePage() {
  const [
    mode,
    rating,
    players,
    curPlayer,
    clearPlayers,
    randomPlayer,
    resetSettings,
  ] = useStore((state) => [
    state.mode,
    state.rating,
    state.players,
    state.curPlayer,
    state.clearPlayers,
    state.randomPlayer,
    state.resetSettings,
  ]);

  const client = useQueryClient();

  const { data, isSuccess, isLoading } = useQuery<Question>(
    ["fetchTruthOrDare", mode, rating],
    () => fetchTruthOrDare(mode, rating),
    {
      staleTime: Infinity,
    },
  );

  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center space-y-8 px-4">
        <h1 className="sr-only">Truth or Dare</h1>
        <div className="space-y-4">
          <h2 className="text-center text-4xl font-semibold">
            {curPlayer ? `${curPlayer}'s turn` : `Truth or Dare`}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  {<CogIcon className="mr-2 h-4 w-4" />}
                  Game Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Game Settings</DialogHeader>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center">
                    {<WrenchIcon className="mr-2 h-4 w-4" />} <span>Mode</span>
                  </div>
                  <ModeForm />
                </div>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center">
                    {<FlameIcon className="mr-2 h-4 w-4" />} <span>Rating</span>
                  </div>
                  <RatingForm />
                </div>
                <DialogFooter className="mt-6">
                  <Button onClick={resetSettings} variant="secondary">
                    {<Undo2Icon className="mr-2 h-4 w-4" />} Reset to default
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Users2Icon className="mr-2 h-4 w-4" />
                  {players.length > 0 ? "Edit Players" : "Add Players"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  {players.length > 0 ? "Edit Players" : "Add Players"}
                </DialogHeader>
                <DialogDescription>
                  A player will be randomly selected for every reroll.
                </DialogDescription>
                <PlayerForm />
                <DialogFooter className="mt-6">
                  <Button onClick={clearPlayers} variant="secondary">
                    {<Trash2Icon className="mr-2 h-4 w-4" />} Clear Players
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {isSuccess ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Badge>{data.type}</Badge>
              <Badge>{data.rating}</Badge>
            </div>
            <p className="text-lg">{data.question}</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : (
          <p>Error</p>
        )}
        <div className="grid gap-3">
          <Button
            onClick={() => {
              client.resetQueries(["fetchTruthOrDare", mode]);
              randomPlayer();
            }}
            size="lg"
          >
            {<RotateCcwIcon className="mr-2 h-4 w-4" />}
            {players.length > 0
              ? "Reroll Player and Question"
              : "Reroll Question"}
          </Button>
          <div className="flex gap-3">
            <div className="grid flex-1 gap-3">
              {players.length > 0 && (
                <Button onClick={() => randomPlayer()} variant="secondary">
                  {<UserIcon className="mr-2 h-4 w-4" />} Reroll Player
                </Button>
              )}
            </div>
            <div className="grid flex-1 gap-3">
              {players.length > 0 && (
                <Button
                  onClick={() =>
                    client.resetQueries(["fetchTruthOrDare", mode])
                  }
                  variant="secondary"
                >
                  {<HelpCircleIcon className="mr-2 h-4 w-4" />}
                  Reroll Question
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
