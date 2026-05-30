import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanityUrl";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BlogPost } from "@/lib/types";

interface ImageValue {
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  alt?: string;
}

interface PortableTextComponentProps {
  children?: React.ReactNode;
}

interface ImageComponentProps {
  value: ImageValue;
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: ImageComponentProps) => {
      if (!value?.asset) return null;

      const imageUrl =
        value.asset.url ||
        urlFor(value).width(1200).height(675).fit("crop").auto("format").url();

      return (
        <div className="relative w-full group h-full">
          <Image
            src={imageUrl}
            alt={value.alt || "Blog image"}
            width={1200}
            height={1200}
            className="rounded-3xl w-full h-full object-cover"
          />
        </div>
      );
    },
  },

  marks: {
    code: ({ children }) => (
      <code className="bg-gray-300 text-gray-900 rounded px-1 py-0.5">
        {children}
      </code>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
  },

  block: {
    h1: ({ children }: PortableTextComponentProps) => (
      <h1 className="text-3xl font-bold my-6 mt-14">{children}</h1>
    ),
    h2: ({ children }: PortableTextComponentProps) => (
      <h2 className="text-2xl font-semibold my-5 mt-14">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps) => (
      <h3 className="text-xl font-semibold my-4 mt-12">{children}</h3>
    ),
    normal: ({ children }: PortableTextComponentProps) => (
      <p className="leading-relaxed mb-4">{children}</p>
    ),

    code: ({ children }: { children?: React.ReactNode }) => (
      <SyntaxHighlighter
        language="javascript"
        style={oneDark}
        className="rounded-xl my-6"
      >
        {children?.toString() || ""}
      </SyntaxHighlighter>
    ),
  },

  list: {
    bullet: ({ children }: PortableTextComponentProps) => (
      <ul className="list-disc pl-6 my-2">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps) => (
      <ol className="list-decimal pl-6 my-2">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }: PortableTextComponentProps) => (
      <li className="mb-1">{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps) => (
      <li className="mb-1">{children}</li>
    ),
  },
};

export const PortableTextContent = ({
  value,
}: {
  value: BlogPost["content"];
}) => {
  return <PortableText value={value} components={components} />;
};
