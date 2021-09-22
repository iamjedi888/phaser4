/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function ParseXML(data) {
  let xml;
  try {
    const parser = new DOMParser();
    xml = parser.parseFromString(data, "text/xml");
    if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
      return null;
    } else {
      return xml;
    }
  } catch (error) {
    return null;
  }
}
