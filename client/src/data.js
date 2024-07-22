import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiMountains,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "assets/beach_cat.jpg",
    label: "Bãi biển",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: "assets/mountain_cat.jpg",
    label: "Núi rừng",
    icon: <GiMountains />,
    description: "This property is has windmills!",
  },
  {
    img: "assets/modern_cat.webp",
    label: "Thành phố",
    icon: <MdOutlineVilla />,
    description: "This property is modern!",
  },
  {
    img: "assets/countryside_cat.webp",
    label: "Nông thôn",
    icon: <TbMountain />,
    description: "This property is in the countryside!",
  },
  {
    img: "assets/pool_cat.jpg",
    label: "Bể bơi",
    icon: <TbPool />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "assets/island_cat.webp",
    label: "Đảo",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  {
    img: "assets/lake_cat.webp",
    label: "Hồ",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "Trượt tuyết",
    icon: <FaSkiing />,
    description: "This property has skiing activies!",
  },
  {
    img: "assets/castle_cat.webp",
    label: "Lâu đài",
    icon: <GiCastle />,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/cave_cat.jpg",
    label: "Hang động",
    icon: <GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/camping_cat.jpg",
    label: "Cắm trại",
    icon: <GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/barn_cat.jpg",
    label: "Nông trại",
    icon: <GiBarn />,
    description: "This property is in a barn!",
  },
  {
    img: "assets/lux_cat.jpg",
    label: "Sang trọng",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
];

export const types = [
  {
    name: "Nguyên căn",
    description: "Khách có toàn bộ nơi này cho riêng mình",
    icon: <FaHouseUser />,
  },
  {
    name: "Phòng riêng",
    description:
      "Khách có phòng riêng trong nhà và được sử dụng các địa điểm chung",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "Phòng chung",
    description:
      "Khách ngủ trong phòng hoặc khu vực chung có thể dùng chung với bạn hoặc người khác",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Bồn tắm",
    icon: <PiBathtubFill />,
  },
  {
    name: "Sản phẩm chăm sóc cá nhân",
    icon: <FaPumpSoap />,
  },
  {
    name: "Vòi tắm ngoài trời",
    icon: <FaShower />,
  },
  {
    name: "Máy giặt",
    icon: <BiSolidWasher />,
  },
  {
    name: "Máy sấy",
    icon: <BiSolidDryer />,
  },
  {
    name: "Móc treo đồ",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "Bàn là",
    icon: <TbIroning3 />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Không gian làm việc",
    icon: <BsPersonWorkspace />
  },
  {
    name: "Máy lạnh",
    icon: <BsSnow />,
  },
  {
    name: "Máy sưởi",
    icon: <GiHeatHaze />,
  },
  {
    name: "Camera an ninh",
    icon: <GiCctvCamera />,
  },
  {
    name: "Bình chữa cháy",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "Dụng cự Sơ cứu",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Dụng cụ nấu ăn",
    icon: <FaKitchenSet />,
  },
  {
    name: "Tủ lạnh",
    icon: <BiSolidFridge />,
  },
  {
    name: "Lò vi sóng",
    icon: <MdMicrowave />,
  },
  {
    name: "Lò sưởi",
    icon: <GiToaster />,
  },
  {
    name: "Vỉ nướng thịt",
    icon: <GiBarbecue />,
  },
  {
    name: "khu ăn uống ngoài trời",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Sân hiên hoặc ban công riêng",
    icon: <MdBalcony />,
  },
  {
    name: "Lửa trại",
    icon: <GiCampfire />,
  },
  {
    name: "Vườn",
    icon: <MdYard />,
  },
  {
    name: "Đỗ xe miễn phí",
    icon: <AiFillCar />,
  },
  {
    name: "Tự check-in",
    icon: <FaKey />
  },
  {
    name: "Cho nuôi pet",
    icon: <MdPets />
  }
];
