/**
 * v0 by Vercel.
 * @see https://v0.dev/t/T2u8FQSegN7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Component() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-5 w-5">
              <ChevronDownIcon className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium">Accordion Item 1</h3>
          </div>
          <div className="h-5 w-5">
            <ChevronDownIcon className="h-full w-full" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-4">
            <p>
              This is the content for the first accordion item. It can include
              text, images, or other UI elements.
            </p>
            <img
              src="/placeholder.svg"
              alt="Accordion Image"
              width={400}
              height={300}
              className="rounded-lg"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <Accordion type="single" collapsible>
              <AccordionItem value="nested-item-1">
                <AccordionTrigger className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-5 w-5">
                      <ChevronDownIcon className="h-full w-full" />
                    </div>
                    <h3 className="text-lg font-medium">
                      Nested Accordion Item 1
                    </h3>
                  </div>
                  <div className="h-5 w-5">
                    <ChevronDownIcon className="h-full w-full" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <p>
                      This is the content for the nested accordion item. It can
                      include text, images, or other UI elements.
                    </p>
                    <img
                      src="/placeholder.svg"
                      alt="Nested Accordion Image"
                      width={400}
                      height={300}
                      className="rounded-lg"
                      style={{ aspectRatio: "400/300", objectFit: "cover" }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
