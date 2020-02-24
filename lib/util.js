export function removeLastSlash(str)
{
	if (!str || str.length==1)	return str;
	if (str[str.length - 1] != '/')	return str;
	return str.substring(0, str.length - 1);
}

