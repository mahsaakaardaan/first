export function toFaDigits(input: any) {
    if (input === null || input === undefined) return input;
  
    // تبدیل به استرینگ برای اطمینان
    const str = input.toString();
  
    // تبدیل همه اعداد انگلیسی به فارسی
    return str.replace(/[0-9]/g, (d:any) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }
  