import { Palette } from "./enums"

export const BackgroundColourPalette: { [key in Palette]: string } = {
    [Palette.PRIMARY]: "bg-blue-500",
    [Palette.SECONDARY]: "bg-slate-50",
    [Palette.SUCCESS]: "bg-lime-500",
    [Palette.FAILURE]: "bg-red-600",
    [Palette.WARNING]: "",
    [Palette.DARK]: "bg-gray-900",
    [Palette.LIGHT]: "bg-slate-50"
};

export const TextColourPalette: { [key in Palette]: string } = {
    [Palette.PRIMARY]: "text-slate-50",
    [Palette.SECONDARY]: "text-blue-500",
    [Palette.SUCCESS]: "text-slate-50",
    [Palette.FAILURE]: "text-slate-50",
    [Palette.WARNING]: "",
    [Palette.DARK]: "text-slate-50",
    [Palette.LIGHT]: "text-gray-900"
};

export const BorderColorPalette: { [key in Palette]: string } = {
    [Palette.PRIMARY]: "border-blue-500",
    [Palette.SECONDARY]: "border-blue-500",
    [Palette.SUCCESS]: "border-lime-500",
    [Palette.FAILURE]: "border-red-600",
    [Palette.WARNING]: "",
    [Palette.DARK]: "border-gray-900",
    [Palette.LIGHT]: "border-white"
};