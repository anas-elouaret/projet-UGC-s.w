import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function OptionSelector({ option, selectedChoices, onSelect }) {
  const isRadio = option.type === "radio";
  const isCheckbox = option.type === "checkbox";

  const handleSelect = (choice) => {
    if (isRadio) {
      // For radio buttons, replace the selected choice
      const newChoices = selectedChoices.filter(
        (sc) => sc.optionId !== option.id
      );
      newChoices.push({
        ...choice,
        optionId: option.id,
        type: "radio",
      });
      onSelect(newChoices);
    } else if (isCheckbox) {
      // For checkboxes, toggle the choice
      const existingIndex = selectedChoices.findIndex(
        (sc) => sc.id === choice.id && sc.type === "checkbox"
      );

      if (existingIndex > -1) {
        // Remove if already selected
        const newChoices = selectedChoices.filter((_, i) => i !== existingIndex);
        onSelect(newChoices);
      } else {
        // Add if not selected
        onSelect([
          ...selectedChoices,
          {
            ...choice,
            optionId: option.id,
            type: "checkbox",
          },
        ]);
      }
    }
  };

  const getSelectedChoice = () => {
    if (isRadio) {
      return selectedChoices.find((sc) => sc.optionId === option.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <h4 className="text-base font-semibold text-white">{option.name}</h4>
        {option.required && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#7CFF5B]/20 text-[#7CFF5B]">
            Required
          </span>
        )}
      </div>

      <div className="space-y-2">
        {option.choices.map((choice) => {
          const isSelected = isRadio
            ? selectedChoices.find(
                (sc) => sc.optionId === option.id && sc.id === choice.id
              )
            : selectedChoices.find((sc) => sc.id === choice.id);

          return (
            <motion.button
              key={choice.id}
              onClick={() => handleSelect(choice)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-[#7CFF5B] bg-[#7CFF5B]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {isRadio && (
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-[#7CFF5B] bg-[#7CFF5B]"
                            : "border-white/30"
                        }`}
                      >
                        {isSelected && (
                          <Check size={14} className="text-black" />
                        )}
                      </div>
                    )}
                    {isCheckbox && (
                      <div
                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-[#7CFF5B] bg-[#7CFF5B]"
                            : "border-white/30"
                        }`}
                      >
                        {isSelected && (
                          <Check size={14} className="text-black" />
                        )}
                      </div>
                    )}
                    <span className="text-sm font-medium text-white">
                      {choice.label}
                    </span>
                  </div>
                </div>
                {choice.price > 0 && (
                  <span className="text-sm font-semibold text-[#7CFF5B] ml-4 whitespace-nowrap">
                    +{choice.price.toLocaleString()} MAD
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
