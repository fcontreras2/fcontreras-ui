# Agregar icono al sistema de iconos

Agrega un nuevo icono al registro `src/components/Icon/icons.ts`.

**Argumento:** `$ARGUMENTS` (nombre del icono, ej: `ambulance`, `clipboard`, `star`)

## Pasos

1. **Leer el registro actual** en `src/components/Icon/icons.ts` para:
   - Ver los paths existentes y mantener el mismo estilo visual (stroke-based, viewBox 0 0 24 24, líneas redondeadas)
   - Verificar que el nombre no exista ya

2. **Diseñar los paths SVG** para el icono `$ARGUMENTS`:
   - `outline`: trazo con `stroke="currentColor"`, `fill="none"`, linecap y linejoin redondeados
   - `solid`: relleno con `fill="currentColor"`, sin stroke
   - Ambos deben representar el mismo concepto visual con el mismo nivel de detalle
   - Los paths deben ser válidos SVG sobre un viewBox de `0 0 24 24`

3. **Agregar la entrada** al objeto `icons` en `src/components/Icon/icons.ts`:
   - Insertar en orden alfabético dentro del grupo temático correspondiente (UI General, Formularios, Comunicación, Archivos y datos, Salud) o crear un nuevo grupo si aplica
   - Formato exacto:
     ```ts
     'nombre-icono': {
       outline: 'M...',
       solid: 'M...',
     },
     ```

4. **Confirmar** mostrando:
   - El nombre del icono agregado
   - El grupo donde fue insertado
   - Un preview del path outline para verificación visual

## Notas
- Los nombres de iconos usan kebab-case: `arrow-down`, `user-group`, `heart-pulse`
- Si el icono tiene múltiples paths, sepáralos con espacio dentro del mismo string: `'M... M...'`
- No crear dependencias externas — todos los paths son SVG puro
