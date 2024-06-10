import { useEffect, MutableRefObject } from "react";

const useScroll = (
  elementId: string | null,
  elementsMap: MutableRefObject<Map<string, HTMLLIElement | null>>
) => {
  useEffect(() => {
    if (elementId) {
      const selectedCard = elementsMap.current.get(elementId);
      if (selectedCard) {
        selectedCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [elementId, elementsMap]);
};

export default useScroll;
