import { Color } from "../../entity/Color";

export interface AddColorInfoDTO extends Pick<Color, "name" | "hexCode"> {}
