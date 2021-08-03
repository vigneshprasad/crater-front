import Logo from "@common/components/atoms/Logo";
import { IMenuItem } from "@constants/ui.constants";
import Svg from "public/svg";
import styled from "styled-components";

import Link from "next/link";

import { NavWrapper, ItemContainer, MenuWrapper } from "./styles";

interface IProps {
  menuItems: IMenuItem[];
  selected: string;
}

const HomeNavbar: React.FC<IProps> = ({ menuItems, selected }) => {
  return (
    <NavWrapper>
      <Logo />
      <MenuWrapper count={menuItems.length}>
        {menuItems.map((item) => {
          const icon = {
            clubs: Svg.Chart,
            wallet: Svg.Wallet,
            account: Svg.Activity,
          }[item.id];

          const Icon = styled(icon)`
            & > path {
              transition: stroke 200ms ease-in-out;
              stroke: ${(props) =>
                item.id === selected
                  ? props.theme.pallete.primary
                  : props.theme.pallete.textTertiary};
            }
          `;
          return (
            <Link href={`/home/${item.id}`} key={item.id} shallow passHref>
              <ItemContainer selected={item.id === selected}>
                <Icon />
              </ItemContainer>
            </Link>
          );
        })}
      </MenuWrapper>
    </NavWrapper>
  );
};

export default HomeNavbar;
