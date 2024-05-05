import { motion } from "framer-motion";

interface SocialLinkProps {
  icon: React.ReactNode;
  label: string;
  //   onClick: () => void;
  className?: string;
}

export const SocialLink = ({
  icon,
  label,
  //   onClick,
  className,
}: SocialLinkProps) => {
  const iconHoverAnimation = {
    scale: 1.1,
    rotate: 2,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  };

  const labelHoverAnimation = {
    y: -2,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  };

  return (
    <div
      //   onClick={onClick}
      className={`flex gap-1 justify-center items-center cursor-pointer ${className}`}
    >
      <motion.div whileHover={iconHoverAnimation}>{icon}</motion.div>
      <motion.div whileHover={labelHoverAnimation}>{label}</motion.div>
    </div>
  );
};
