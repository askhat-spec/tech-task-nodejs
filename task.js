// Задача выполннена с помощью 
// алгоритма Бойера-Мура для поиска образа в строке

function BMSearch(string, substring)
{
    // Длина строки
    let n = string.length;
    // Длина подстроки которую ищем
    let m = substring.length;

    // 256 возможных символов
    // Инициализируем как все позиции как -1
    let badchar = Array(256).fill(-1);
    let matches = 0;
    // Заполняем все символы подстроки по позициям в массиве
    for (let i = 0; i < m; ++i)
    {
        badchar[substring.charAt(i).charCodeAt(0)] = i;
    }
    let j = m - 1;
    let s = 0;
    while (s <= (n - m))
    {
        while (j >= 0 && substring.charAt(j) == string.charAt(s + j))
        {
            j--;
        }
        // Если дошел до начало подстроки до все совпало
        if (j < 0)
        {
            // Инкрементим совпадение
            matches++;
            if (s + m < n)
            {
                s += m - badchar[string.charCodeAt(s + m)];
            }
            else
            {
                s += 1;
            }
        }
        else
        {
            s += Math.max(1, j - badchar[string.charCodeAt(s + j)]);
        }
        j = m - 1;
    }
    return matches
}

function main(string)
{
    const minLen = 2
    let maxLen = Math.floor(string.length / 2)

    for (let currentLen = maxLen; currentLen >= minLen; currentLen--)
    {
        for (let index = 0; index <= string.length; index++)
        {
            substring = string.slice(index, index + currentLen)
            if (substring.length == currentLen && BMSearch(string, substring) > 1)
            {
                return substring
            }
        }
    }
    
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите последовательность символов: ', function (string) {
    let a = main(string);
    console.log(a)
    rl.close();
});



