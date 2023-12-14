import {
  HamburgerMenuIcon,
  Pencil2Icon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { toast } from "./ui/use-toast";
import { getAxiosErorrMessage } from "./utils";

const ReorderableList = (props: {
  onEdit: any;
  authToken: string;
  githubToken: string;
  selectedRepoId: number | null;
  guidelines: any;
  loadingGuidelines: boolean;
  setGuidelines: any;
  triggerRefetchGuidelines: any;
}) => {
  const [highlightAboveId, setHighlightAboveId] = useState<any>(null);
  const [highlightBelowId, setHighlightBelowId] = useState<any>(null);

  return (
    <Card className="m-4">
      <CardContent>
        <div className="scrollable-table">
          <Table>
            <TableCaption
              onDragOver={() => {
                setHighlightBelowId(null);
                setHighlightAboveId(null);
              }}
            >
              {props.loadingGuidelines && !props.guidelines?.length && (
                <div className="w-full flex items-center justify-center m-2">
                  <ReloadIcon className="mr-2 mb-4 h-6 w-6 animate-spin" />
                </div>
              )}
              Guidelines set up for your repo. Drag and drop your guidelines to
              reorder them.
            </TableCaption>
            <TableHeader
              onDragOver={() => {
                setHighlightBelowId(null);
                setHighlightAboveId(null);
              }}
            >
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Detail</TableHead>
                <TableHead className="w-[40px]">Edit</TableHead>
                <TableHead className="text-right w-[40px]">Delete</TableHead>
              </TableRow>
            </TableHeader>
            {props.guidelines.map((guideline: any) => (
              <TableRow
                key={guideline.id}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData("id", guideline.id.toString());
                }}
                onDragOver={(e) => {
                  const dragId = Number(e.dataTransfer.getData("id"));

                  if (dragId === guideline.id) {
                    return;
                  }

                  e.preventDefault();

                  // const x = e.clientX;
                  const y = e.clientY;
                  // @ts-ignore
                  const boundingRect = e.target.getBoundingClientRect();

                  const middleY = boundingRect.top + boundingRect.height / 2;

                  if (y > middleY) {
                    setHighlightBelowId(guideline.id);
                    setHighlightAboveId(null);
                  } else {
                    setHighlightBelowId(null);
                    setHighlightAboveId(guideline.id);
                  }
                }}
                onDragEnd={(e) => {
                  setHighlightBelowId(null);
                  setHighlightAboveId(null);
                }}
                onDrop={(e) => {
                  const droppedId: number = Number(
                    e.dataTransfer.getData("id"),
                  );

                  if (droppedId === guideline.id) {
                    return;
                  }

                  const droppedGuideline = props.guidelines.find(
                    (g: any) => g.id === droppedId,
                  );

                  setHighlightBelowId(null);
                  setHighlightAboveId(null);

                  let newGuidelines = props.guidelines.filter(
                    (g: any) => g.id !== droppedId,
                  );

                  let guidelineInsertIndex: any = null;
                  newGuidelines.forEach((g: any, i: number) => {
                    if (g.id === guideline.id) {
                      guidelineInsertIndex = i;
                    }
                  });

                  if (guidelineInsertIndex === null) {
                    return;
                  }

                  if (highlightBelowId !== null) {
                    guidelineInsertIndex += 1;
                  }

                  console.log(guidelineInsertIndex);

                  newGuidelines = [
                    ...newGuidelines.slice(0, guidelineInsertIndex),
                    droppedGuideline,
                    ...newGuidelines.slice(guidelineInsertIndex),
                  ];

                  props.setGuidelines(newGuidelines);
                }}
                onDragLeave={(e: any) => {
                  setHighlightBelowId(null);
                  setHighlightAboveId(null);
                }}
                className={"relative cursor-pointer"}
              >
                <TableCell className="font-medium cursor-grab">
                  <HamburgerMenuIcon />
                </TableCell>
                <TableCell
                  className="font-medium"
                  onClick={() => {
                    props.onEdit(guideline);
                  }}
                >
                  {guideline.title}
                </TableCell>
                <TableCell
                  onClick={() => {
                    props.onEdit(guideline);
                  }}
                >
                  {guideline.details}
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    onClick={() => props.onEdit(guideline)}
                    className="p-2"
                  >
                    <Pencil2Icon />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="secondary" className="p-2">
                        <TrashIcon />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete your guideline.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            axios
                              .delete(
                                `${process.env.NEXT_PUBLIC_API_URL}/guidelines/${guideline.id}`,
                                {
                                  headers: {
                                    Authorization: "Bearer " + props.authToken,
                                  },
                                  data: {
                                    github_token: props.githubToken,
                                  },
                                },
                              )
                              .then((res: any) => {
                                props.triggerRefetchGuidelines();
                              })
                              .catch((e) => {
                                console.error(e);
                                toast({
                                  variant: "destructive",
                                  title: "Could not delete guideline",
                                  description:
                                    getAxiosErorrMessage(e).toString(),
                                });
                              });
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
                {guideline.id === highlightBelowId && (
                  <div className="absolute h-[2px] bottom-[-2px] bg-blue-500 w-full left-0" />
                )}
                {guideline.id === highlightAboveId && (
                  <div className="absolute h-[2px] top-[-1px] bg-blue-500 w-full left-0" />
                )}
              </TableRow>
            ))}
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReorderableList;
