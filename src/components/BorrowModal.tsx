import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateBorrowMutation } from "@/redux/api/Borrow/borrowAPI";
import { format } from "date-fns";
import { BookOpen, CalendarIcon } from "lucide-react";
import { type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface BorrowModalProps {
  trigger?: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bookTitle: string;
  maxCopies: number;
}

type BorrowFormData = {
  copies: number;
  dueDate: Date;
};

const BorrowModal = ({
  trigger,
  isOpen,
  onOpenChange,
  bookTitle,
  maxCopies,
}: BorrowModalProps) => {


  const navigate = useNavigate();
  const form = useForm<BorrowFormData>({
    defaultValues: {
      copies: 1,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    },
  });

  const [createBorrow, {isLoading}] = useCreateBorrowMutation();


  const onSubmit: SubmitHandler<BorrowFormData> = async (data) => {
    try {
      console.log("Borrow form submitted:", data);

      const res = await createBorrow({ bookId: "someBookId", ...data }).unwrap();

      toast.success("Book borrowed successfully", {
        description: `You have borrowed ${data.copies} copy(ies) of "${bookTitle}"`,
        action: {
          label: "Hide",
          onClick: () => console.log("Borrowed book"),
        },
      });

      navigate("/borrow-summary");
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("Failed to borrow book", {
        description: "Please try again later.",
        action: {
          label: "Hide",
          onClick: () => console.log("Error borrowing book"),
        },
      });
    } finally {
      onOpenChange(false);
      form.reset();
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <BookOpen className="h-5 w-5" />
            Borrow Book
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Number of Copies */}
              <FormField
                control={form.control}
                name="copies"
                rules={{
                  required: "Number of copies is required",
                  min: {
                    value: 1,
                    message: "At least 1 copy is required",
                  },
                  max: {
                    value: maxCopies,
                    message: `Maximum ${maxCopies} copies available`,
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Number of Copies *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        max={maxCopies}
                        placeholder="Enter number of copies"
                        className="h-11 sm:h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base sm:text-sm"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                    <p className="text-xs text-gray-500">
                      Maximum {maxCopies} copies available
                    </p>
                  </FormItem>
                )}
              />

              {/* Due Date */}
              <FormField
                control={form.control}
                name="dueDate"
                rules={{
                  required: "Due date is required",
                  validate: (value) => {
                    if (!value) return "Due date is required";
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    selectedDate.setHours(0, 0, 0, 0);
                    return (
                      selectedDate >= today || "Due date cannot be in the past"
                    );
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Due Date *
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal h-11 sm:h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="h-11 sm:h-10 px-6 text-base sm:text-sm font-medium order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 sm:h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 flex items-center justify-center gap-2 text-base sm:text-sm font-medium order-1 sm:order-2"
              >
                <>
                  <BookOpen size={16} />
                  Borrow Book
                </>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
