import React from 'react';
import { FiSmartphone } from 'react-icons/fi';
import { FiHome } from 'react-icons/fi';
import { FiTv } from 'react-icons/fi';
import { FiSmile } from 'react-icons/fi';

type IconName = 'mobile' | 'make-up' | 'laptop' | 'house';

type Props = {
  icon: IconName;
  size?: number;
};

function Icon({ icon, size = 15 }: Props) {
  return (
    <div>
      {icon == 'mobile' && <FiSmartphone size={size} />}
      {icon == 'make-up' && <FiSmile size={size} />}
      {icon == 'laptop' && <FiTv size={size} />}
      {icon == 'house' && <FiHome size={size} />}
    </div>
  );
}

export default Icon;
