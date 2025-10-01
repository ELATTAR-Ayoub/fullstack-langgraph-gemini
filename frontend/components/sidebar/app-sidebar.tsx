import * as React from "react";
import { MessageSquare, MoreHorizontal, Trash2, Edit3 } from "lucide-react";

import { SidebarHead } from "./sidebar-header";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChatRooms } from "@/context";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * AppSidebar - Displays chat rooms grouped by date with delete and rename functionality
 * Shows: Today, Yesterday, Previous 7 days, Older
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    chatRooms,
    currentChatRoomId,
    switchToChatRoom,
    deleteChatRoom,
    updateChatRoom,
  } = useChatRooms();
  const pathname = usePathname();

  // Rename dialog state
  const [isRenameDialogOpen, setIsRenameDialogOpen] = React.useState(false);
  const [renameRoomId, setRenameRoomId] = React.useState<string>("");
  const [newRoomName, setNewRoomName] = React.useState("");

  // Group chat rooms by date for sidebar display
  const groupedChatRooms = React.useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const groups = {
      Today: [] as typeof chatRooms,
      Yesterday: [] as typeof chatRooms,
      "Previous 7 days": [] as typeof chatRooms,
      Older: [] as typeof chatRooms,
    };

    // Sort rooms by update time and categorize by date
    chatRooms
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .forEach((room) => {
        const roomDate = new Date(
          room.updatedAt.getFullYear(),
          room.updatedAt.getMonth(),
          room.updatedAt.getDate()
        );

        if (roomDate.getTime() === today.getTime()) {
          groups.Today.push(room);
        } else if (roomDate.getTime() === yesterday.getTime()) {
          groups.Yesterday.push(room);
        } else if (roomDate >= weekAgo) {
          groups["Previous 7 days"].push(room);
        } else {
          groups.Older.push(room);
        }
      });

    return groups;
  }, [chatRooms]);

  // Handle chat room deletion
  const handleDeleteChatRoom = (e: React.MouseEvent, roomId: string) => {
    e.preventDefault();
    e.stopPropagation();
    deleteChatRoom(roomId);
  };

  // Handle rename chat room
  const handleRenameChatRoom = (
    e: React.MouseEvent,
    roomId: string,
    currentName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setRenameRoomId(roomId);
    setNewRoomName(currentName);
    setIsRenameDialogOpen(true);
  };

  // Handle rename confirmation
  const handleRenameConfirm = () => {
    if (newRoomName.trim() && renameRoomId) {
      updateChatRoom(renameRoomId, { title: newRoomName.trim() });
      setIsRenameDialogOpen(false);
      setRenameRoomId("");
      setNewRoomName("");
    }
  };

  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader>
          <SidebarHead />
        </SidebarHeader>
        <SidebarContent>
          {/* Render chat room groups */}
          {Object.entries(groupedChatRooms).map(([groupName, rooms]) => {
            if (rooms.length === 0) return null;

            return (
              <SidebarGroup key={groupName}>
                <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {rooms.map((room) => {
                      const isActive = pathname === `/chat/${room.id}`;
                      return (
                        <SidebarMenuItem key={room.id}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            className="group relative"
                          >
                            <div
                              className="flex items-center justify-between w-full cursor-pointer"
                              onClick={() => switchToChatRoom(room.id)}
                            >
                              {/* Chat room display */}
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate text-sm">
                                  {room.title}
                                </span>
                              </div>
                              {/* Actions dropdown menu */}
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  asChild
                                  className={cn(
                                    "opacity-0 group-hover:opacity-100 transition-opacity",
                                    isActive && "opacity-100"
                                  )}
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreHorizontal />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) =>
                                      handleRenameChatRoom(
                                        e,
                                        room.id,
                                        room.title
                                      )
                                    }
                                  >
                                    <Edit3 />
                                    Rename
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    variant="destructive"
                                    className="text-destructive focus:text-destructive"
                                    onClick={(e) =>
                                      handleDeleteChatRoom(e, room.id)
                                    }
                                  >
                                    <Trash2 />
                                    Delete chat
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename Chat Room</DialogTitle>
            <DialogDescription>
              Enter a new name for this chat room.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="room-name">Chat Room Name</Label>
              <Input
                id="room-name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="Enter chat room name..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRenameConfirm();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRenameConfirm}
              disabled={!newRoomName.trim()}
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
