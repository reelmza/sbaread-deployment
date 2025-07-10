return (
  <AccordionItem
    className="relative border-b-0 h-fit"
    value={`item-${key}`}
    key={key}
  >
    <AccordionTrigger className="ml-[16px] cursor-pointer h-8 flex items-center hover:no-underline">
      <div className="flex items-center">
        <div className="flex items-center justify-center text-xs text-gray-600 font-light  bg-resd-100 leading-none w-[38px] mt-[2px]">
          CH {key + 1}
        </div>
        <div className={` ${item.children ? "hover:underline" : ""}`}>
          {item.name}
        </div>
      </div>
    </AccordionTrigger>

    {/* Content */}
    {item.children ? (
      <AccordionContent>
        {item.children
          ? item.children.map((itemNest1, keyNest1) => {
              return (
                <Accordion
                  type="single"
                  collapsible
                  className="p-0 ml-4"
                  key={keyNest1}
                >
                  <AccordionItem
                    className="relative border-b-0 h-fit"
                    value={`item-${itemNest1}`}
                  >
                    <AccordionTrigger className="ml-[16px] cursor-pointer h-8 flex items-center hover:no-underline">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center text-xs text-gray-600 font-light  bg-resd-100 leading-none w-[38px] mt-[2px] ">
                          {key + 1}.{keyNest1 + 1}
                        </div>
                        <div
                          className={` ${
                            itemNest1.children ? "hover:underline" : ""
                          }`}
                        >
                          {itemNest1.name}
                        </div>
                      </div>
                    </AccordionTrigger>

                    {/* Content */}
                    {itemNest1.children ? (
                      <AccordionContent className="mt-2">
                        {itemNest1.children
                          ? itemNest1.children.map((itemNest2, keyNest2) => {
                              return (
                                <div
                                  key={keyNest2}
                                  className="relative ml-4 mb-2 flex items-center text-xs bg-redd-400 h-5"
                                >
                                  <div className="ml-6 mr-2 text-gray-400 font-light">
                                    {key}.{keyNest1}.{keyNest2}
                                  </div>
                                  <div>{itemNest2.name}</div>

                                  {/* Absolute elements */}
                                  {/* Edit Button */}
                                  <button
                                    onClick={() => {
                                      setActiveItem(item);
                                      setOpenEditModal(true);
                                      setNestCount([key, keyNest1, keyNest2]);
                                    }}
                                    className="absolute top-0 h-5 z-10 cursor-pointer"
                                  >
                                    <PenBox size={16} />
                                  </button>
                                </div>
                              );
                            })
                          : ""}
                      </AccordionContent>
                    ) : (
                      <AccordionContent>
                        {/* Add button if no Level 2 chapters */}
                        <button
                          onClick={() => {
                            setActiveItem(item);
                            setNestCount([key]);
                            setActionToDo("add");
                            setOpenEditModal(true);
                          }}
                          className="top-0 h-8 z-10 cursor-pointer text-sm"
                        >
                          Add sectionSfdfd
                        </button>
                      </AccordionContent>
                    )}

                    {/* Absolute elements */}
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setActiveItem(item);
                        setOpenEditModal(true);
                        setNestCount([key, keyNest1]);
                      }}
                      className="absolute top-0 h-8 z-10 cursor-pointer"
                    >
                      <PenBox size={16} />
                    </button>

                    {/* Add button for more level 2 chapters */}
                    {keyNest1 === chapters[keyNest1].children!.length - 1 ? (
                      <button
                        onClick={() => {
                          setActiveItem(item);
                          setNestCount([key, keyNest1]);
                          setActionToDo("add");
                          setOpenEditModal(true);
                        }}
                        className="top-0 h-8 z-10 cursor-pointer text-sm"
                      >
                        Add sectionXX
                      </button>
                    ) : (
                      ""
                    )}
                  </AccordionItem>
                </Accordion>
              );
            })
          : ""}
      </AccordionContent>
    ) : (
      <AccordionContent>
        {/* Add button if no level 2 chapters */}
        {key === chapters.length - 1 ? (
          <button
            onClick={() => {
              setActiveItem(item);
              setNestCount([key]);
              setActionToDo("add");
              setOpenEditModal(true);
            }}
            className="top-0 h-8 z-10 cursor-pointer text-sm ml-5"
          >
            Add sections LV 2
          </button>
        ) : (
          ""
        )}
      </AccordionContent>
    )}

    {/* Absolute elements */}
    {/* Edit Chapter Button */}
    <button
      onClick={() => {
        setActiveItem(item);
        setOpenEditModal(true);
        setNestCount([key]);
      }}
      className="absolute top-0 h-8 z-10 cursor-pointer"
    >
      <PenBox size={16} />
    </button>

    {/* Add button for level 1 chapters */}
    {key === chapters.length - 1 ? (
      <button
        onClick={() => {
          setActiveItem(item);
          setNestCount([]);
          setActionToDo("add");
          setOpenEditModal(true);
        }}
        className="top-0 h-8 z-10 cursor-pointer text-sm"
      >
        Add section LV 1
      </button>
    ) : (
      ""
    )}
  </AccordionItem>
);
