import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateBookMutation } from "@/redux/api/Book/bookAPI";
import type { IBook } from "@/types";
import { Edit2, Loader2, Save } from "lucide-react";
import { type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface EditBookModalProps {
  book: IBook;
  trigger?: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type BookFormData = Omit<IBook, "_id" | "createdAt" | "updatedAt">;

const EditBookModal = ({
  book,
  trigger,
  isOpen,
  onOpenChange,
}: EditBookModalProps) => {
  const form = useForm<BookFormData>({
    defaultValues: {
      title: book.title || "",
      author: book.author || "",
      genre: book.genre || "FICTION",
      isbn: book.isbn || "",
      description: book.description || "",
      copies: book.copies ?? 0,
      available: book.available ?? true,
    },
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const onSubmit: SubmitHandler<BookFormData> = async (data) => {
    try {
      const bookData: BookFormData = { ...data };
      const res = await updateBook({
        bookId: book._id,
        bookData,
      }).unwrap();

      toast.success("Book has been updated successfully", {
        description: `${res.data.title} has been updated in your library`,
        className: "toast-success",
        action: {
          label: "Hide",
          onClick: () => console.log("Updated The Book"),
        },
      });
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update book", {
        description: "Please try again later.",
        className: "toast-error",
        action: {
          label: "Hide",
          onClick: () => console.log("Error While Updating Book"),
        },
      });
    } finally {
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Edit2 className="h-5 w-5" />
            Edit Book
          </DialogTitle>
        </DialogHeader>

        <Form {...form} key={`${book._id}-${isOpen}`}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* First grid: Title, Author, ISBN, Copies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Book Title *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter book title"
                        className="h-11 sm:h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                rules={{ required: "Author is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Author *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter author name"
                        className="h-11 sm:h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* ISBN */}
              <FormField
                control={form.control}
                name="isbn"
                rules={{ required: "ISBN is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      ISBN *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter ISBN number"
                        className="h-11 sm:h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Copies */}
              <FormField
                control={form.control}
                name="copies"
                rules={{
                  required: "Number of copies is required",
                  min: {
                    value: 0,
                    message: "Number of copies cannot be negative",
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
                        min="0"
                        placeholder="Enter number of copies"
                        className="h-11 sm:h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base sm:text-sm"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Genre and Availability Status in same row */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Genre */}
              <FormField
                control={form.control}
                name="genre"
                rules={{ required: "Genre is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Genre *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 sm:h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base sm:text-sm">
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FICTION">Fiction</SelectItem>
                        <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                        <SelectItem value="SCIENCE">Science</SelectItem>
                        <SelectItem value="HISTORY">History</SelectItem>
                        <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                        <SelectItem value="FANTASY">Fantasy</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Available Status */}
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Availability Status
                    </FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 sm:h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base sm:text-sm">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Available</SelectItem>
                        <SelectItem value="false">Not Available</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter book description (optional)"
                      className="min-h-[90px] sm:min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none text-base sm:text-sm"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="h-11 sm:h-10 px-6 text-base sm:text-sm font-medium order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 sm:h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 flex items-center justify-center gap-2 text-base sm:text-sm font-medium order-1 sm:order-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Update Book
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
