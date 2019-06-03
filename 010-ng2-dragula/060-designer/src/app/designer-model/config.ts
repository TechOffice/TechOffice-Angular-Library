import ConfigType from './config-type';
import ControlType from './control-type';

export default interface Config {
    name: string;
    type: ConfigType;
    items: Config[];
    control: ControlType;
}