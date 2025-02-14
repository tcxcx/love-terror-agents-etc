"use client";

import { QRImage } from "react-qrbtf";
import { useEffect, useState } from "react";
import { FramedQRCodeProps } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultQRSize } from "@/lib/utils";

export const FramedQRCode = ({
  image,
  link,
  frameText,
  copyLink,
}: FramedQRCodeProps) => {
  const [logoBase64, setLogoBase64] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [qrError, setQrError] = useState<boolean>(false);

  const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject("Failed to convert image to Base64.");
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      return "";
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      if (!link) {
        setQrError(true);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const base64 = await convertImageToBase64(image);
        setLogoBase64(base64);
        setQrError(false);
      } catch (error) {
        console.error("Error loading QR code:", error);
        setQrError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [image, link]);

  if (!link || qrError) {
    return (
      <div className="w-32 h-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {frameText && (
        <div className="text-xs text-gray-500 mb-2">{frameText}</div>
      )}
      {isLoading ? (
        <Skeleton className="w-48 h-48 rounded-lg p-4 mb-2" />
      ) : (
        <div className="group">
          <div
            className="relative cursor-pointer flex items-center justify-center"
            onClick={copyLink}
            role="button"
            aria-label="Copy QR link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                copyLink?.();
              }
            }}
          >
            <QRImage
              value={link}
              size={defaultQRSize}
              image={logoBase64 || undefined}
              level="M"
              type="rect"
              darkColor="#000000"
              lightColor="#FFFFFF"
              posType="rect"
              posColor="#C70039"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0  group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 rounded-lg">
              <span className="text-red-500 text-base uppercase font-bold">
                Click to copy link
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FramedQRCode;
